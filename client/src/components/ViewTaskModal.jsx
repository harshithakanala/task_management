import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";

const ViewTaskModal = ({ showViewModal, handleViewModalClose, id }) => {
  const [task, setTask] = useState(null);

  useEffect(() => {
    const getSingleTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/task/single/${id}`,
          { withCredentials: true }
        );
        setTask(response.data.task);
      } catch (error) {
        console.log(error.response.data.message);
        toast.error("Error fetching task details");
      }
    };
    if (id) {
      getSingleTask();
    }
  }, [id]);

  return (
    <Modal show={showViewModal} onHide={handleViewModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>View Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {task && (
          <Stack gap={3}>
            <Stack gap={1}>
              <p className="fw-bold mb-0">Title:</p>
              <p>{task.title}</p>
            </Stack>
            <Stack gap={1}>
              <p className="fw-bold mb-0">Description:</p>
              <p>{task.description}</p>
            </Stack>
          </Stack>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleViewModalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewTaskModal;
