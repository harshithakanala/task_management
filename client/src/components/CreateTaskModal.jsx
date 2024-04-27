import axios from "axios";
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import toast from "react-hot-toast";

const CreateTaskModal = ({ showCreateModal, handleCreateModalClose, setTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateTask = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/task/post",
        { title, description },
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setTasks((prevTasks) => [...prevTasks, response.data.task]);
      setTitle("");
      setDescription("");
      handleCreateModalClose();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Modal show={showCreateModal} onHide={handleCreateModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Task</Modal.Title>
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCreateModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreateTask}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTaskModal;
