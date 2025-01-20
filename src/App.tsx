import { Card as CardComponent } from './components/Card.tsx';

function App() {
  return (
    <>
      <CardComponent card={{ suit: 'spades', rank: 'A' }} />
    </>
  );
}

export default App;
