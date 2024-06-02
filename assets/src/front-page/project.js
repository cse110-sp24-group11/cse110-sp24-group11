// Display the top 3 projects and their descriptions
document.addEventListener('DOMContentLoaded', function() {
    // Helper function to get projects from local storage
    function getProjects() {
        return JSON.parse(localStorage.getItem('projectsData')) || [];
    }

    // Render top 3 projects
    function renderTopProjects() {
        const projects = getProjects().slice(0, 3); // Get the top 3 projects
        const projectContainer = document.getElementById('recent-projects');
        projectContainer.innerHTML = '';

        if (projects.length === 0) {
            projectContainer.innerHTML = '<li>No projects available</li>';
        } else {
            projects.forEach(project => {
                const projectItem = document.createElement('li');
                projectItem.innerHTML = `
                    <div class="project-card">
                        <div class="project-image" style="background-image: url(${project.image});"></div>
                        <div class="project-details">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                        </div>
                    </div>
                `;
                projectContainer.appendChild(projectItem);
            });
        }
    }

    // Initial rendering of top 3 projects
    renderTopProjects();
});