import 'package:flutter/material.dart';
import '../models/task_model.dart';
import '../services/api_service.dart';

class TaskProvider with ChangeNotifier {
  List<Task> _tasks = [];
  bool _isLoading = false;
  final ApiService _apiService = ApiService();

  List<Task> get tasks => _tasks;
  bool get isLoading => _isLoading;


  Future<void> fetchTasks({String? search, String? status}) async {
    _isLoading = true;
    notifyListeners();

    try {
      final response = await _apiService.getTasks(search: search, status: status);
      if (response.statusCode == 200) {
        List data = response.data;
        _tasks = data.map((task) => Task.fromJson(task)).toList();
      }
    } catch (e) {
      debugPrint("Error fetching tasks: $e");
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }


  Future<void> addNewTask(String title, String description) async {
    try {
      final response = await _apiService.addTask(title, description);
      if (response.statusCode == 201 || response.statusCode == 200) {
        await fetchTasks(); // List ko refresh karein
      }
    } catch (e) {
      debugPrint("Error adding task: $e");
    }
  }


  Future<void> toggleStatus(int id, String currentStatus) async {
    try {
      final response = await _apiService.toggleTaskStatus(id, currentStatus);
      if (response.statusCode == 200) {
        await fetchTasks(); // UI update karne ke liye refresh
      }
    } catch (e) {
      debugPrint("Error toggling status: $e");
    }
  }


  Future<void> removeTask(int id) async {
    try {
      final response = await _apiService.deleteTask(id);
      if (response.statusCode == 200) {
        _tasks.removeWhere((task) => task.id == id); // Local list se hatayein
        notifyListeners();
      }
    } catch (e) {
      debugPrint("Error deleting task: $e");
    }
  }
}