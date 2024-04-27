import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Stack } from "react-bootstrap";
import toast from "react-hot-toast";

const UpdateTaskModal = ({
  showUpdateModal,
  handleUpdateModalClose,
  id,
  setTasks,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("incomplete");

  useEffect(() => {
    const getSingleTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/task/single/${id}`,
          { withCredentials: true }
        );
        const { title, description, status } = response.data.task;
        setTitle(title);
        setDescription(description);
        setStatus(status);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    if (id) {
      getSingleTask();
    }
  }, [id]);

  const handleUpdateTask = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/task/update/${id}`,
        { title, description, status },
        { withCredentials: true }
      );
      toast.success(response.data.message);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, title, description, status } : task
        )
      );

      handleUpdateModalClose();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Modal show={showUpdateModal} onHide={handleUpdateModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleUpdateModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateTask}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateTaskModal;
