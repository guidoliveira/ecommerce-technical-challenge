import {render} from "@testing-library/react";
import ProductCard from "../components/ProductCard";

describe("ProductCard Snapshot", () => {
    it("should match the snapshot", () => {
        const {container} = render(<ProductCard product={{id: 1, name: "Mouse Gamer", price: 199.99, description: "A simple test product", category: "Test Category", imageUrl: ""}}  onDelete={() => {}}/>);
        expect(container).toMatchSnapshot();
    });
});