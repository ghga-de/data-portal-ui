import { render, screen } from "@testing-library/react"
import FooterIcons from "./components/footer/footerIcons"

test('on click, open social media icons in new tab', () => {
    render(<FooterIcons />);

    expect(screen.getByRole('link', { name: /twitter/i })).toBeCalled();
})
