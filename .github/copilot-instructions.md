# HRM System - Copilot Instructions

This document provides guidelines for GitHub Copilot based on the project structure and patterns.

## Project Overview

This is a Human Resource Management (HRM) system built with React, TypeScript, and TailwindCSS.

## Key Components and Pages

### Core Structure

- React Router for navigation
- Protected routes for authenticated areas
- Component-based architecture
- Responsive design using Tailwind CSS

### Page Types

1. **List Pages**: Display collections of data (e.g., EmployeeListPage, DepartmentListPage, PositionListPage)
   - Include breadcrumb navigation
   - Search functionality
   - Pagination
   - Multi-select with checkboxes
   - Action buttons for CRUD operations

2. **Detail Pages**: Display detailed information about a specific entity
   - Tab-based navigation for different sections
   - Header with summary information
   - Action buttons (edit, delete, etc.)

3. **Form Pages**: Create or edit entities
   - Validation
   - Structured sections
   - Save/Cancel actions
   - Form state management

### Common Components

1. **Breadcrumb**: Navigation trail
2. **Pagination**: For list pages
3. **Tabs**: For organizing content on detail pages
4. **ViewToggle**: Switch between list and card views
5. **ProtectedRoute**: Authentication wrapper

## Styling Guidelines

- Use Tailwind CSS classes for styling
- Form inputs should have consistent styling:
  ```css
  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
  ```
- Status indicators should use appropriate colors:
  - Active: `bg-green-100 text-green-800`
  - Inactive: `bg-red-100 text-red-800`
  - Draft/On-leave: `bg-yellow-100 text-yellow-800`

## Data Structure

### Services

- API services follow a consistent pattern with pagination and filtering
- Mock data is used for development
- Async/await pattern with error handling

### Models/Interfaces

Key entities:
- Employee
- Department
- Position

## Page Structure

Each page should follow this structure:
1. Breadcrumb navigation
2. Title and subtitle
3. Action toolbar (search, filters, add button)
4. Main content (table, form, or details)
5. Pagination (for list views)

## Best Practices

1. Use TypeScript interfaces for all data structures
2. Handle loading states with spinners
3. Provide empty states for lists
4. Include error handling
5. Use consistent formatting for dates and currency
6. Follow responsive design principles

## Examples

### List Page Structure
```tsx
const SomethingListPage = () => {
  // State management
  // Data fetching with useEffect
  // Handler functions
  
  return (
    <div>
      <Breadcrumb items={[{ label: 'Something' }]} />
      
      <h1 className="text-3xl font-bold mb-2">Something Management</h1>
      <p className="text-gray-600 mb-6">Description text</p>
      
      {/* Toolbar */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        {/* Action buttons */}
        {/* Search */}
      </div>
      
      {/* Content with loading, empty and data states */}
      
      {/* Pagination */}
    </div>
  );
};
```

### Detail Page Structure
```tsx
const SomethingDetailPage = () => {
  // State and data fetching
  
  return (
    <div>
      <Breadcrumb items={[
        { label: 'Something', path: '/something' },
        { label: 'Item Name' }
      ]} />
      
      {/* Header card with summary and actions */}
      
      {/* Tabs with different sections */}
      <Tabs tabs={[
        { id: 'overview', label: 'Overview', content: <OverviewSection /> },
        { id: 'details', label: 'Details', content: <DetailsSection /> }
      ]} />
    </div>
  );
};
```

### Form Page Structure
```tsx
const SomethingFormPage = () => {
  // Form state and handlers
  
  return (
    <div>
      <Breadcrumb items={[/* ... */]} />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Add/Edit Something</h1>
        <p className="text-gray-600">Description</p>
      </div>
      
      {/* Action buttons */}
      
      <form className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Form sections */}
        
        {/* Footer with actions */}
      </form>
    </div>
  );
};
```
