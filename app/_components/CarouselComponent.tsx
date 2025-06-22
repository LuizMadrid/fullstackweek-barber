import {
	Carousel,
	CarouselContent,
	CarouselNext,
	CarouselPrevious,
} from './ui/carousel';

interface CarouselComponentProps {
  children: React.ReactNode;
}

export const CarouselComponent = ({ children }: CarouselComponentProps) => {
	return (
		<Carousel
			opts={{
				dragFree: true,
				loop: true,
				align: 'start',
			}}
		>
			<CarouselPrevious className="hidden 2md:flex" />

			<CarouselContent>{children}</CarouselContent>

			<CarouselNext className="hidden 2md:flex" />
		</Carousel>
	);
};
