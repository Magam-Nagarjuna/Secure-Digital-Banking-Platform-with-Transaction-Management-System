import React from "react";
import modalStyles from "../../styles/modalStyles";

/**
 * Yes/No confirmation popup, styled with the same "modal-*"
 * classes as <Modal /> so it matches the app's existing dialog
 * look. Used wherever a page needs to confirm a destructive or
 * irreversible action before calling its handler.
 *
 * Optional text-input mode (showInput) turns this into a themed
 * replacement for window.prompt(): pass inputValue/onInputChange
 * to control the text, and read the value from your own state
 * inside onConfirm. Existing yes/no callers are unaffected since
 * showInput defaults to false.
 */
const ConfirmDialog = ({
    open,
    title = "Please Confirm",
    message,
    confirmLabel = "Yes",
    cancelLabel = "Cancel",
    type = "info",
    onConfirm,
    onCancel,
    showInput = false,
    inputValue = "",
    onInputChange,
    inputPlaceholder = "",
    confirmDisabled = false,
}) => {

    if (!open) return null;

    return (
        <div className="modal-overlay" onClick={onCancel}>

            <div className="modal-box" onClick={(e) => e.stopPropagation()}>

                <div
                    className={`modal-icon ${
                        type === "error" ? "modal-icon-error" : "modal-icon-info"
                    }`}
                >
                    {type === "error" ? "⚠️" : "❓"}
                </div>

                {title && <h3 className="modal-title">{title}</h3>}

                <p className="modal-message">{message}</p>

                {showInput && (
                    <textarea
                        className="modal-input"
                        value={inputValue}
                        placeholder={inputPlaceholder}
                        onChange={(e) => onInputChange && onInputChange(e.target.value)}
                        rows={3}
                        style={{
                            width: "100%",
                            marginTop: "10px",
                            padding: "10px 12px",
                            borderRadius: "8px",
                            border: "1px solid #CBD5E1",
                            fontFamily: "inherit",
                            fontSize: "14px",
                            resize: "vertical",
                        }}
                    />
                )}

                <div className="modal-actions" style={modalStyles.actions}>

                    <button
                        type="button"
                        className="fin-btn modal-ok-btn"
                        onClick={onConfirm}
                        disabled={confirmDisabled}
                        style={confirmDisabled ? { opacity: 0.6, cursor: "not-allowed" } : undefined}
                    >
                        {confirmLabel}
                    </button>

                    <button
                        type="button"
                        className="fin-btn modal-ok-btn"
                        style={{ background: "#94a3b8" }}
                        onClick={onCancel}
                    >
                        {cancelLabel}
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ConfirmDialog;