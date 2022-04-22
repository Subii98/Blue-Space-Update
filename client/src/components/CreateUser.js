import React, { useState } from "react";

function CreateUser() {
    const [name, setName] = useState("");

    const handleSubmit = async (data) => {
      const res = await fetch("/createUser", {
        method: "PUT",
        body: JSON.stringify({
          username: {name},
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    };
    
    return (
      <div>
            <form onSubmit={handleSubmit}>        
            <label>
                Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />       
             </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
}

export default CreateUser
