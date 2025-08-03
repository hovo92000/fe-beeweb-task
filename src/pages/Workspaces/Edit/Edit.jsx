import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchWorkspaces, updateWorkspace } from '../../../api';

import "./styles.scss";

export default function EditWorkspace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ws, setWs] = useState(null);
  const [originalName, setOriginalName] = useState('');

  useEffect(() => {
    fetchWorkspaces().then(res => {
      const found = res.data.find(w => w.id.toString() === id);
      if (found) {
        setWs(found);
        setOriginalName(found.name);
      }
    });
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    await updateWorkspace(id, ws);
    navigate('/workspaces');
  };

  if (!ws) return <div>Loading…</div>;

 const saveDisabled =
    !ws.name.trim() ||
    ws.name === originalName;

  return (
    <div className='edit-workspace-container'>
      <form onSubmit={handleSubmit}>
        <h2 className='edit-workspace-title'>Edit Workspace</h2>
        <input placeholder='Edit' value={ws.name} onChange={e => setWs({ ...ws, name: e.target.value })} />
        <div className='edit-workspace-btns-container'>
          <button className='back-btn'>Back</button>
          <button disabled={saveDisabled} className='edit-btn' type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}