import os
import sys

def initialize_hrm_system():
    # Set up necessary configurations
    os.environ['HRM_SYSTEM_ENV'] = 'development'
    os.environ['HRM_SYSTEM_DB'] = 'hrm_system_db'

    # Set up necessary dependencies
    try:
        import some_dependency
    except ImportError:
        print("Error: some_dependency is not installed.")
        sys.exit(1)

    print("HRM system initialized successfully.")

if __name__ == "__main__":
    initialize_hrm_system()
