import {render, screen} from "@testing-library/react";
import ProductCard from "../components/ProductCard";

describe("ProductCard", () => {
    it("should render product information correctly", () => {
        render(
            <ProductCard
                product={{
                    id: 1,
                    name: "Mouse Gamer",
                    category: "Periféricos",
                    description: "Mouse RGB",
                    price: 199.9,
                    imageUrl: "https://picsum.photos/400/300",
                }}
                onDelete={() => {}}
            />
        );

        expect(screen.getByText(/Mouse Gamer/i)).toBeInTheDocument();
        expect(screen.getByText(/Periféricos/i)).toBeInTheDocument();
        expect(screen.getByText(/Mouse RGB/i)).toBeInTheDocument();
        expect(screen.getByText(/R\$\s*199\.90/)).toBeInTheDocument();
    });
});