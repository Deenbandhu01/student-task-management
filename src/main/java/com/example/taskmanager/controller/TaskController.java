
package com.example.taskmanager.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.repo.TaskRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

  private final TaskRepository repo;

  public TaskController(TaskRepository repo) {
    this.repo = repo;
  }

  @GetMapping
  public List<Task> all() {
    return repo.findAll();
  }

  @PostMapping
  public Task create(@RequestBody Task task) {
    return repo.save(task);
  }

  @PutMapping("/{id}")
  public Task update(@PathVariable Long id, @RequestBody Task updated) {
    Task t = repo.findById(id).orElseThrow();
    t.setCompleted(updated.isCompleted());
    return repo.save(t);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    repo.deleteById(id);
  }
}
