import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Card, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import CreateTaskModal from "./CreateTaskModal";
import UpdateTaskModal from "./UpdateTaskModal";
import ViewTaskModal from "./ViewTaskModal";
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { Navigate } from "react-router-dom";

const Home = ({ isAuthenticated, tasks, setTasks, taskTitle }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewTaskId, setViewTaskId] = useState(null);
  const [updatedTaskId, setUpdateTaskId] = useState(null);

  const deleteTask = async (id) => {
    await axios
      .delete(`http://localhost:4000/api/v1/task/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleCreateModalClose = () => setShowCreateModal(false);
  const handleUpdateModalClose = () => setShowUpdateModal(false);
  const handleViewModalClose = () => setShowViewModal(false);

  const handleCreateModalShow = () => setShowCreateModal(true);

  const handleUpdateModalShow = (id) => {
    setUpdateTaskId(id);
    setShowUpdateModal(true);
  };

  const handleViewModalShow = (id) => {
    setViewTaskId(id);
    setShowViewModal(true);
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="container my-4">
      <div className="row mb-3">
        <div className="col">
          <h1 className="text-3xl font-bold">{taskTitle}</h1>
        </div>
        <div className="col text-end">
          <Button variant="primary" onClick={handleCreateModalShow}>
            Create Task
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className="flex flex-col h-full">
              <Card className="flex-1">
                <Card.Body className="flex flex-col justify-between">
                  <div>
                    <Card.Title className="text-lg font-semibold truncate">
                      {task.title}
                    </Card.Title>
                    <Card.Text className="text-sm text-gray-600 truncate">
                      {task.description}
                    </Card.Text>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <MdEdit
                      onClick={() => handleUpdateModalShow(task._id)}
                      className="text-blue-500 cursor-pointer"
                    />
                    <MdDelete
                      onClick={() => deleteTask(task._id)}
                      className="text-red-500 cursor-pointer"
                    />
                    <FaEye
                      onClick={() => handleViewModalShow(task._id)}
                      className="text-green-500 cursor-pointer"
                    />
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <h1 className="text-xl">YOU DON'T HAVE ANY {taskTitle}</h1>
        )}
      </div>

      <CreateTaskModal
        handleCreateModalClose={handleCreateModalClose}
        showCreateModal={showCreateModal}
        setTasks={setTasks}
      />

      <UpdateTaskModal
        handleUpdateModalClose={handleUpdateModalClose}
        showUpdateModal={showUpdateModal}
        id={updatedTaskId}
        setTasks={setTasks}
      />

      <ViewTaskModal
        handleViewModalClose={handleViewModalClose}
        showViewModal={showViewModal}
        id={viewTaskId}
      />
    </div>
  );
};

export default Home;
