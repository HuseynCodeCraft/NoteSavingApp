const axios = require('../axios.js');
const path = require('path');
const { config, sendGetRequest } = require('../apiConfig.js');

const base_url = `${config.BASE_HOST}:${config.BASE_PORT}/api/users/`;
const noteUrl = `${base_url}method-user-note/:NoteId:/`;

const disallowedCharsRegex = /[/%@\\()]+/;

exports.UploadPhoto = async (req, res) => {
  try {
    const response = await axios.post(`${base_url}upload-profile-photo`, req, { headers: { "Authorization": req.headers['authorization'], "X-Authorization": req.headers['x-authorization'] } });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'An error occurred' });
  }
};

exports.GetPhoto = async (req, res) => {
  try {
    const response = await axios.get(`${base_url}get-profile-photo`, { headers: { "Authorization": req.headers['authorization'], "X-Authorization": req.headers['x-authorization'] } });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'An error occurred' });
  }
};

const GenerateNoteUrl = (method, NoteId) => {
  return noteUrl.replace('method', method).replace(':NoteId:', NoteId);
};

exports.GetNotes = async (req, res) => {
  const { NoteId } = req.params;
  if (disallowedCharsRegex.test(NoteId)) {
    return res.status(400).json({ message: 'Invalid NoteId format' });
  }
  const url = GenerateNoteUrl('get', NoteId);
  
  try {
    const response = await axios.get(url, { headers: { "Authorization": req.headers['authorization'], "X-Authorization": req.headers['x-authorization'] } });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal server error' });
  }
};

exports.PostNotes = async (req, res) => {
  try {
    const response = await axios.post(`${base_url}post-user-note`, req.body, { headers: { "Authorization": req.headers['authorization'], "X-Authorization": req.headers['x-authorization'] } });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal server error' });
  }
};

exports.UpdateNotes = async (req, res) => {
  const { NoteId } = req.params;
  if (disallowedCharsRegex.test(NoteId)) {
    return res.status(400).json({ message: 'Invalid NoteId format' });
  }
  const url = GenerateNoteUrl('update', NoteId);

  try {
    const response = await axios.put(url, JSON.stringify(req.body), { headers: { "Authorization": req.headers['authorization'], "X-Authorization": req.headers['x-authorization'] } });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal server error' });
  }
};

exports.DeleteNotes = async (req, res) => {
  const { NoteId } = req.params;
  if (disallowedCharsRegex.test(NoteId)) {
    return res.status(400).json({ message: 'Invalid NoteId format' });
  }
  const url = GenerateNoteUrl('delete', NoteId);
  try {
    const response = await axios.delete(url, { headers: { "Authorization": req.headers['authorization'], "X-Authorization": req.headers['x-authorization'] } });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal server error' });
  }
};

