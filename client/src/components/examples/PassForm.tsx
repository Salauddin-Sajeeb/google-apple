import PassForm from '../PassForm';

export default function PassFormExample() {
  return (
    <PassForm 
      onSubmit={(data) => console.log('Form submitted:', data)} 
      isLoading={false}
    />
  );
}
