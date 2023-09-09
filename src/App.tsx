import { fields } from "./Data";
import { Form } from "./Form";

function App() {
  return (
    <div>
      <h1>Dynamic form</h1>
      <Form fields={fields} />
    </div>
  );
}

export default App;
