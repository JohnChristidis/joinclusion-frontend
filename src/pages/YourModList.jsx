import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
  Typography
} from "@material-tailwind/react";
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { config } from "../utils/config";
import {DEPModal} from "../components/DEPModal.jsx"
import { Link } from 'react-router-dom';



export function YourModList({id}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mods, setMods] = useState([]);
  const [utility, setUtility] = useState("");
  const [chosedId, setChosenId] = useState(100);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const chooseUtility = (u,chosen) => {
    setUtility(u);
    setChosenId(chosen);
    openModal();
  }


  const editMod = (id) => {
    // Navigate to the edit page with the id parameter using Link
    return (
      <Link to={`/yourmod/${id}`} />
    );
  };

  const publishMod = async (id) => {
    try {
      const response = await fetch(`${config.backendUrl}/publish-mod/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ published: true }) // Change this value as needed
      });

      const data = await response.json();
      closeModal();

      // Update the mods state to reflect the change
      setMods(prevMods => prevMods.map(mod => (mod.id === id ? { ...mod, published: true } : mod)));

      return data;
    } catch (error) {
      console.error("Error publishing mod:", error);
      throw error;
    }
  };

  const unpublishMod = async (id) => {
    try {
      const response = await fetch(`${config.backendUrl}/unpublish-mod/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ published: false }) // Change this value as needed
      });

      const data = await response.json();
      closeModal();

      // Update the mods state to reflect the change
      setMods(prevMods => prevMods.map(mod => (mod.id === id ? { ...mod, published: false } : mod)));

      return data;
    } catch (error) {
      console.error("Error unpublishing mod:", error);
      throw error;
    }
  };

  const deleteMod = async (id) => {
    try {
      const response = await fetch(`${config.backendUrl}/delete-mod/${id}`, {
      method: 'DELETE'
      });

      const data = await response.json();
      closeModal();

      // Update the mods state by removing the deleted mod
      setMods(prevMods => prevMods.filter(mod => mod.id !== id));

      return data;
    } catch (error) {
      console.error("Error deleting mod:", error);
      throw error;
    }
  };

  useEffect(() => {
    // Make an HTTP GET request to retrieve the mod data from the server using Axios
    axios.get(`${config.backendUrl}/mods/${id}`) // Adjust the endpoint as needed
      .then(response => setMods(response.data))
      .catch(error => console.error("Error fetching mod data:", error));
  }, [id]);

 return (
    <div className="border border-blue-gray  shadow-md p-4 m-1 max-w-full h-300">
      <Typography
        as="li"
        variant="h3"
        color="blue-gray"
        className="p-3 mb-8 font-semibold border-b-4  border-blue-gray "
      >
        <span className=" flex items-center">
          Available Mods
        </span>
      </Typography>
      <div>
    {mods.length === 0 ? (
      <p className="text-center text-gray-600 mt-4">
        No Mods? Let's Create A Mod!!
      </p>
    ) : (
      mods.map(mod => (
        <Card key={mod.id} className="rounded-none border-r-2 border-l-2 mt-2 w-full">
          <List>
            <ListItem ripple={false} className="py-1 pr-1 pl-4 text-lg font-semibold w-full">
              <span className="text-2xl font-semibold w-full">{mod.mod_name}</span>
              <ListItemSuffix className="flex items-center space-x-2">
                <button
                  className={`h-10 ${mod.published ? 'w-28' : 'w-20'} ${mod.published ? 'bg-gray-500' : 'bg-orange-500'} text-white rounded-lg px-1`}
                  onClick={() => chooseUtility(mod.published ? 'unpublish' : 'publish', mod.id)}
                >
                  {mod.published ? 'Unpublish' : 'Publish'}
                </button>
                <Link to={`/yourmod/${mod.id}`}>
                  <button
                    className="h-10 w-20 bg-blue-500 text-white rounded-lg px-1"
                  >
                    Edit
                  </button>
                </Link>

                <button
                  className="h-10 w-20 bg-red-500 text-white rounded-lg px-1"
                  onClick={() => chooseUtility("delete", mod.id)}
                >
                  Delete
                </button>
              </ListItemSuffix>
            </ListItem>
          </List>
          <DEPModal
            isOpen={isModalOpen}
            onClose={closeModal}
            chosenId={chosedId}
            utility={utility}
            onPublish={publishMod}
            onUnpublish={unpublishMod}
            onDelete={deleteMod}
            onEdit={editMod}
          />
        </Card>
      ))
    )}
    <Card className="rounded-none border-r-2 border-l-2 w-full mt-2">
      <List>
        <ListItem ripple={false} className="py-1 pr-1 pl-4 w-full flex justify-center">
          <Link to="/newmod" className="flex items-center bg-white text-blue-500 rounded-lg px-4 font-semibold text-lg">
            <h3>Create New Mod</h3>
          </Link>
        </ListItem>
      </List>
    </Card>
  </div>
    </div>
  );
}
