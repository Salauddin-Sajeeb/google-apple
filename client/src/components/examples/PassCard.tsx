import PassCard from '../PassCard';

export default function PassCardExample() {
  return (
    <PassCard 
      firstName="John"
      lastName="Doe"
      email="john.doe@example.com"
      points={250}
      passId="PASS-ABC123"
    />
  );
}
