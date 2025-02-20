const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>Are you sure you want to delete this comment?</p>
        <div className="modal-buttons">
          <button className="modal-btn confirm" onClick={onConfirm}>
            Yes
          </button>
          <button className="modal-btn cancel" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
