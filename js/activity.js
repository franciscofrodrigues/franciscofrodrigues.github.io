class Activity {
    constructor(activityId, accessToken) {
        this.activityId = activityId;
        this.accessToken = accessToken;
        this.name = null;
        this.distance = null;
        this.avg_speed = null;
        this.imageURL = null;
    }

    // Detalhes de uma atividade em concreto retirada da lista
    fetchActivityDetails() {
        let activityUrl = `https://www.strava.com/api/v3/activities/${this.activityId}?access_token=${this.accessToken}`;

        return fetch(activityUrl)
            .then(response => response.json())
            .then(data => {
                const placeholderURL = 'images/placeholder.jpg';

                if (data.photos && data.photos.primary && data.photos.primary.urls && data.photos.primary.urls[600] !== null) {
                    this.imageURL = data.photos.primary.urls[600];
                } else {
                    this.imageURL = placeholderURL;
                }

                this.start_date_local = data.start_date_local;
                this.type = data.type;
                this.moving_time = data.moving_time;
                this.distance = data.distance;
                this.avg_speed = data.average_speed;

                return this;
            });
    }

    // Formatar data
    formatDate(dateString) {
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');;
        const day = date.getDate().toString().padStart(2, '0');;
        const hours = date.getUTCHours().toString().padStart(2, '0');;
        const mins = date.getUTCMinutes().toString().padStart(2, '0');;

        const formattedDate = `${day}/${month}`;
        const formattedHours = `${hours}:${mins}`;

        return { formattedDate, formattedHours };
    }

    // Injetar html em index.html
    renderHtml(activityElementList, activityElementGrid) {
        // Converter hora e data de começo de atividade
        const { formattedDate, formattedHours } = this.formatDate(this.start_date_local);

        // Converter segundos para h:m
        const hours = Math.floor(this.moving_time / 60 / 60);
        const minutes = Math.floor(this.moving_time / 60) - (hours * 60);
        const formattedMovingTime = hours.toString() + 'h' + minutes.toString().padStart(2, '0') + 'm';

        const listLayout = document.getElementById('listLayout');
        const gridLayout = document.getElementById('gridLayout');

        if (listLayout.checked) {
            activityElementList.style.display = 'block';
            activityElementGrid.style.display = 'none';
        } else {
            activityElementList.style.display = 'none';
            activityElementGrid.style.display = 'block';
        }

        // Criar elemento com base nos dados obtidos
        // Se o layout for lista
        activityElementList.innerHTML = `
            <div class="activity">
                <div class="activity_details">
                    <p class="description">${formattedDate} &#183; ${formattedHours} &#183; ${this.type}</p>
                </div>
                <div class="activity_fields">
                    <div class="activity_time">
                        <h1>${formattedMovingTime}</h1>
                        <p class="description">Tempo</p>
                    </div>
                    <div class="activity_distance">
                        <h1>${(this.distance / 1000).toFixed(1)} km</h1>
                        <p class="description">Distância</p>
                    </div>
                    <div class="activity_distance">
                        <h1>${(this.avg_speed * 3.6).toFixed(1)} km/h</h1>
                        <p class="description">Velocidade Média</p>
                    </div>
                </div>
                <hr>
            </div>
        `;

        // Se o layout for grelha
        activityElementGrid.innerHTML = `
            <div class="activity_card">
                <img src="${this.imageURL}" alt="Activity Image">
                <div class="activity_details_card">
                    <p class="description">${formattedDate} &#183; ${formattedHours} &#183; ${this.type}</p>
                </div>
                <div class="activity_fields_card">
                    <div class="activity_time">
                        <h1>${formattedMovingTime}</h1>
                        <p class="description">Tempo</p>
                    </div>
                    <div class="activity_distance">
                        <h1>${(this.distance / 1000).toFixed(1)} km</h1>
                        <p class="description">Distância</p>
                    </div>
                    <div class="activity_distance">
                        <h1>${(this.avg_speed * 3.6).toFixed(1)} km/h</h1>
                        <p class="description">Velocidade Média</p>
                    </div>
                </div>
            </div>
        `;
    }
}