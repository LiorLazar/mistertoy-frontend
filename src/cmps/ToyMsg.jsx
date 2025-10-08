export function ToyMsg({ toy, msg, handleChange, onSaveMsg, onRemoveMsg }) {
  const { txt } = msg

  return (
    <div className="msg-container">
      <h1>Toy messages:</h1>
      <form className="login-form" onSubmit={onSaveMsg}>
        <input
          type="text"
          name="txt"
          value={txt}
          placeholder="Enter Your Message"
          onChange={handleChange}
          required
          autoFocus
        />
        <button>Send</button>
      </form>
      <div>
        <ul className="clean-list">
          {toy.msgs &&
            toy.msgs.map(msg => (
              <li key={msg.id}>
                By: {msg.by ? msg.by.fullname : 'Unknown User'} - {msg.txt}
                <button type="button" onClick={() => onRemoveMsg(msg.id)}>
                  ✖️
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
