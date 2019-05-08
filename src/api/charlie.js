import axios from "axios";

const charlieAPI = async ({ term, limit, month, year, offset }) => {
  // console.log("term, limit, month, year", term, limit, month, year);
  const proxyurl = "https://cors-anywhere.herokuapp.com/"; // using this proxy to send Access-Control
  const url = "https://hicharlie.com/fake_api/v1.0/users/9999/transactions";
  const res = await axios.get(proxyurl + url, {
    params: {
      search_string: term,
      month: month,
      year: year,
      limit: limit,
      offset: offset
    }
  });

  return res.data.transactions;
};

export default charlieAPI;
