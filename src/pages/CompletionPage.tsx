import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Completion from "../components/Completion";

const CompletionPage = () => {
  const navigate = useNavigate();

  const handleReset = () => {
    navigate("/brsrxmlupload");
  };

  return (
    <Layout>
      <Completion onReset={handleReset} />
    </Layout>
  );
};

export default CompletionPage;
