import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createWorkspace, checkSlugAvailability } from '../../../api';
import { isValidSlug } from '../../../utils/slugValidator';
import useDebounce from '../../../hooks/useDebounce';

import "./styles.scss";

export default function CreateWorkspace() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [available, setAvailable] = useState(null);
  const [suggestion, setSuggestion] = useState(null);
  const debounced = useDebounce(slug, 500);
  const navigate = useNavigate();

  useEffect(() => {
    if (isValidSlug(debounced)) {
      checkSlugAvailability(debounced).then(res => {
        setAvailable(res.data.available)
        setSuggestion(res.data.suggestion)
        console.log();
        
    });
    }
  }, [debounced]);

  const handleSubmit = async e => {
    e.preventDefault();
    await createWorkspace({ name, slug });
    navigate('/workspaces');
  };

  return (
    <div className='create-workspace-container'>
      <form onSubmit={handleSubmit}>
        <h2 className='create-workspace-title'>Create Workspace</h2>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
        />

        <label>
          <input
            value={slug}
            onChange={e => setSlug(e.target.value)}
            list="slug-suggestions"
            placeholder="slug"
          />
        </label>
        <datalist id="slug-suggestions">
          {suggestion && <option value={suggestion} />}
        </datalist>

        {available === false && (
          <p style={{ color: 'red' }}>That slug is taken.</p>
        )}
        <div className='create-workspace-btns-container'>
          <div className='back-btn' onClick={() => navigate(-1)}>Back</div>
          <button className='create-btn' type="submit" disabled={!name || !slug || available === false}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
}