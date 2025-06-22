'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Prisma } from '@prisma/client';

import { Button } from '@/app/_components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/app/_components/ui/dialog';
import { Loader2 } from 'lucide-react';

interface UserBarbershopsProps {
  barbershop: Prisma.BarbershopGetPayload<{
    include: {
      user: true;
    };
  }>;
}

export const ActionModal = ({ barbershop }: UserBarbershopsProps) => {
	const [isConfirming, setIsConfirming] = useState(false);
	const [submitIsLoading, setSubmitIsLoading] = useState(false);

	const handleOpenConfirm = () => {
		setIsConfirming(true);
	};

	const handleDeleteBarbershop = async () => {
		setSubmitIsLoading(true);
		try {
			await fetch('/panel/delete/actions/delete-barbershop', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					barbershopId: barbershop.id,
				}),
			});

			setIsConfirming(false);
		} catch (error) {
			console.error(error);
		} finally {
			setSubmitIsLoading(false);
			window.location.reload();
		}
	};

	return (
		<>
			<DialogContent className="flex flex-col items-center justify-center border-none rounded-lg w-fit">
				<DialogHeader>
					<DialogTitle className="text-center">
            Qual ação deseja fazer ?
					</DialogTitle>
					<DialogDescription className="text-center text-gray-400">
            Escolha uma das opções abaixo para continuar.
					</DialogDescription>
				</DialogHeader>

				<div className="flex justify-between w-full gap-4">
					<Button
						variant={'secondary'}
						className="flex items-center justify-center w-full gap-2 font-bold"
					>
						<Link href={`/panel/update/${barbershop.id}`}>Editar</Link>
					</Button>

					<DialogClose asChild>
						<Button
							variant={'destructive'}
							onClick={handleOpenConfirm}
							className="flex items-center justify-center w-full gap-2 font-bold"
						>
              Deletar
						</Button>
					</DialogClose>
				</div>
			</DialogContent>

			<Dialog open={isConfirming} onOpenChange={setIsConfirming}>
				<DialogContent className="flex flex-col items-center justify-center border-none rounded-lg w-fit">
					<DialogHeader className="space-y-4">
						<DialogTitle className="text-center capitalize">
              Deletar Barbearia
						</DialogTitle>
						<DialogDescription className="text-center text-gray-400">
							<p>Tem certeza que deseja deletar seu estabelecimento?</p>
							<span>ATENÇÃO: Essa ação não poderá ser desfeita.</span>
						</DialogDescription>
					</DialogHeader>

					<div className="flex justify-between w-full gap-4">
						<DialogClose asChild>
							<Button
								variant={'secondary'}
								className="flex items-center justify-center w-full gap-2 font-bold min-w-32"
							>
                Voltar
							</Button>
						</DialogClose>

						<Button
							variant={'destructive'}
							onClick={handleDeleteBarbershop}
							className="flex items-center justify-center w-full gap-2 font-bold min-w-32"
							disabled={submitIsLoading}
						>
							{submitIsLoading ? (
								<p className="flex items-center justify-center gap-1">
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Carregando...
								</p>
							) : (
								<p>Deletar</p>
							)}
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};
