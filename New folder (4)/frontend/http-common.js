import axios from "axios";

export default axios.create({
  method:'OPTIONS, PUT, POST, GET, DELETE',
  baseURL: "http://localhost:8080",
  headers: { 'Content-Type': 'application/json',
  'Access-Control-Allow-Origin' : 'http://192.168.1.5:3000',
  'Accept': 'application/json',
  'Vary':'Origin'
 }
});