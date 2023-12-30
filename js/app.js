class App {
    constructor() {
        this.authenticate = this.authenticate.bind(this);
        this.authenticate();
        this.accessToken = null;

        this.activities = [];
    }

    // Autenticação e obtenção do token de acesso
    authenticate() {
        fetch('https://www.strava.com/oauth/token', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    client_id: '118500',
                    client_secret: 'e0e6952ecf95c01964b7a3d155938e2d3ef169dc',
                    refresh_token: '3178a31ad9945094532cf391bac4b65a52b8019d',
                    grant_type: 'refresh_token'
                })
            })
            .then(response => response.json())
            .then(response => {
                this.accessToken = response.access_token;
                this.getActivities(response);
            });
    }

    // Listar atividades do utilizador autenticado
    getActivities(response) {
        const activitiesCount = 10; // Máximo de 200
        const activitiesLink = `https://www.strava.com/api/v3/athlete/activities?per_page=${activitiesCount}&access_token=${response.access_token}`;

        fetch(activitiesLink)
            .then(response => response.json())
            .then(data => {
                this.activities = data.map(activity => new Activity(activity.id, this.accessToken));
                this.renderActivities();
            });
    }

    // Injetar html e ordenar/filtrar atividades
    renderActivities() {
        const activitiesList = document.getElementById('activities_list');
        const activitiesGrid = document.getElementById('activities_grid');
        activitiesList.innerHTML = '';
        activitiesGrid.innerHTML = '';

        // Carregar todas as atividades e de seguida apresentar ao utilizador
        Promise.all(this.activities.map(activity => activity.fetchActivityDetails()))
            .then(() => {
                const distanceOrdered = document.getElementById('distance');
                const activityTypeFilters = document.querySelectorAll('input[name="activityType"]:checked');

                // Filtrar atividades por tipo
                let filteredActivities = [...this.activities];
                if (activityTypeFilters.length > 0) {
                    const selectedTypes = Array.from(activityTypeFilters).map(filter => filter.value);
                    filteredActivities = filteredActivities.filter(activity => selectedTypes.includes(activity.type));
                }

                // Ordenar segundo distância ou data
                if (distanceOrdered.checked) {
                    filteredActivities.sort((a, b) => a.distance - b.distance);
                } else {
                    filteredActivities.sort((a, b) => new Date(b.start_date_local) - new Date(a.start_date_local));
                }

                if (filteredActivities.length === 0) {
                    const message = document.createElement('h2');
                    message.className = "message";
                    message.innerHTML = 'Ainda não existem atividades<br>com estas características.';
                    activitiesList.appendChild(message);
                } else {
                    filteredActivities.forEach(activity => {
                        const activityElementList = document.createElement('div');
                        const activityElementGrid = document.createElement('div');

                        activity.renderHtml(activityElementList, activityElementGrid);

                        activitiesList.appendChild(activityElementList);
                        activitiesGrid.appendChild(activityElementGrid);
                    });
                }
            });

    }
}

const app = new App();

// Atualizar página quando houver mudança de filtros
const orderAndTypeFilters = document.querySelectorAll('input[name="order"], input[name="activityType"], input[name="layout"]');
orderAndTypeFilters.forEach(filter => {
    filter.addEventListener('change', () => {
        app.renderActivities();
    });
});