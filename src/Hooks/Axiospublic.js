import axios from "axios";

const axiospublic= axios.create({
    baseURL:`http://localhost:3000`
});

export default axiospublic;