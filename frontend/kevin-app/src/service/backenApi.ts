import React, { useState, useContext } from "react";
import axios from 'axios';


//const axios = require('axios');
var backend_URL = "http://localhost:3001";

export const AppService = {
     getUsers: async () => {
        const response = await axios.get(backend_URL + '/getUsers');
        return response.data;
    },

     addUser: async (user_data:any) =>  {
        const response = await axios.post(backend_URL + '/addUser', user_data);
        return response.data;
    },

    updateUser: async (user_data: any) => {
        const response = await axios.put(`${backend_URL}/updateUser`, user_data);
        return response.data;
    },
      
      deleteUser: async (user_id:any) => {
        const response = await axios.delete(`${backend_URL}/deleteUser`, { data: {id: user_id} });
        return response.data;
    },
    multiAddUser: async (user_data:any) =>  {
        const response = await axios.post(backend_URL + '/multiAddUser', {user_data:user_data});
        return response.data;
    },      

}



