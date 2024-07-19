import { describe, it, expect } from 'vitest'
import { useToDoStore } from '../stores/ToDoStore'

describe('ToDoStore', () => {
    it('adds a new todo', () => {
        const todoStore = useToDoStore()
        todoStore.addTodo('Buy groceries')
        expect(todoStore.todos).toContain('Buy groceries')
    })

    it('removes a todo', () => {
        const todoStore = useToDoStore()
        todoStore.addTodo('Buy groceries')
        todoStore.removeTodo('Buy groceries')
        expect(todoStore.todos).not.toContain('Buy groceries')
    })

    it('marks a todo as completed', () => {
        const todoStore = useToDoStore()
        todoStore.addTodo('Buy groceries')
        todoStore.markAsCompleted('Buy groceries')
        expect(todoStore.completedTodos).toContain('Buy groceries')
    })

    it('returns the number of todos', () => {
        const todoStore = useToDoStore()
        todoStore.addTodo('Buy groceries')
        todoStore.addTodo('Clean the house')
        expect(todoStore.todoCount).toBe(2)
    })
})
