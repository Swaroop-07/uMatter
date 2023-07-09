import React, { useEffect, useState } from "react";
import "../App.css";
// import TransactionForm from "../components/TransactionForm.js";
// import TransactionTable from "../components/TransactionTable.js";
import Cookies from "js-cookie";
// import { useSelector } from "react-redux"; 
import NavigationBox from "../components/NavigationBox/NavigationBox";
import Body from "../assets/images/Body.png";
// import { useQuery } from "react-query"
const Home = () => {
  const [backendData, setBackendData] = useState([]);
  // const [editTransaction, setEditTransaction] = useState({});
  const [loading, setLoading] = useState(true);
  // const userDetails = useSelector((state) => state.auth.user);
  useEffect(() => {
    fetchTransaction();
  }, []);
  const fetchTransaction = async () => {
    const token = Cookies.get("token");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    if(res.ok)
    {
      setLoading(false)
    }
    const { data } = await res.json();
    setBackendData(data);
  };

  return (
    <div className="App">
      <NavigationBox />
      <div style={{ width: "100%", marginLeft: "15%", display:"inline-flex"  }}>
        <img src={Body} style={{ width: "85%"}}/>
      </div>
    </div>
  );
};

export default Home;
 {/* <TransactionForm fetchTransaction={fetchTransaction} editTransaction={editTransaction} />
<br/><br/>
    <TransactionTable data={backendData} fetchTransaction={fetchTransaction} setEditTransaction={setEditTransaction}/>
    <br /> */}
