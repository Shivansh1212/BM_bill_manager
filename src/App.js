import "./App.css";
import AddBill from "./components/addBill";
import Bills from "./components/bills";

function App() {
  return (
    <div>
<header className=" bg-gray-400 shadow-md py-4">
  <h1 className="text-3xl font-bold text-center text-blue-700">
    Adithya Car Wash Services
  </h1>
</header>

      <AddBill/>
      <Bills/>
    </div>
  );
}

export default App;
