import { Button } from './Button.styled';

export function LoadButton({ onClick }) {
  return (
    <Button type="button" onClick={onClick}>
      Load more
    </Button>
  );
}
