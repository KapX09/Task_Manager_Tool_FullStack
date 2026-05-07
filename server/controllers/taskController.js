const Task = require('../models/Task');
const Project = require('../models/Project');
const Log = require('../models/Log');

const getDashboard = async (req, res) => {
  try {
    const query = req.user.role === 'ADMIN'
      ? {}
      : { assignedTo: req.user.id };

    const tasks = await Task.find(query);
    const now = new Date();

    const stats = {
      total: tasks.length,
      todo: tasks.filter(t => t.status === 'TODO').length,
      inProgress: tasks.filter(t => t.status === 'IN_PROGRESS').length,
      done: tasks.filter(t => t.status === 'DONE').length,
      overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < now && t.status !== 'DONE').length
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyTasks = async (req, res) => {
  try {
    const query = req.user.role === 'ADMIN'
      ? {}
      : { assignedTo: req.user.id };

    const tasks = await Task.find(query)
      .populate('projectId', 'name')
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name')
      .sort({ dueDate: 1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjectTasks = async (req, res) => {
  try {
    const query = req.user.role === 'ADMIN'
      ? { projectId: req.params.projectId }
      : { projectId: req.params.projectId, assignedTo: req.user.id };

    const tasks = await Task.find(query)
      .populate('assignedTo', 'name email')
      .populate('projectId', 'name')
      .sort({ dueDate: 1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, projectId } = req.body;

    if (!title || !projectId) {
      return res.status(400).json({ message: 'Title and projectId are required' });
    }

    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Only admins can create tasks' });
    }

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const task = await Task.create({
      ...req.body,
      createdBy: req.user.id
    });

    await Log.create({
      userId: req.user.id,
      action: 'CREATE_TASK',
      entityType: 'TASK',
      entityId: task._id,
      message: `Created task: ${task.title}`
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const isAdmin = req.user.role === 'ADMIN';
    const isAssigned = String(task.assignedTo) === String(req.user.id);

    if (!isAdmin && !isAssigned) {
      return res.status(403).json({ message: 'Not authorised to update this task' });
    }

    const updateData = isAdmin ? req.body : { status: req.body.status };

    const updated = await Task.findByIdAndUpdate(req.params.id, updateData, { new: true });

    await Log.create({
      userId: req.user.id,
      action: 'UPDATE_TASK',
      entityType: 'TASK',
      entityId: task._id,
      message: `Updated task: ${task.title}`
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboard, getMyTasks, getProjectTasks, createTask, updateTask };