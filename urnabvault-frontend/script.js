document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('create-ticket-form');
    const ticketsContainer = document.getElementById('tickets-container');
    const backend_url = 'http://localhost:8080';

    form.addEventListener('submit', createTicket);

    // Load tickets on page load
    fetchTickets();

    async function createTicket(e) {
        e.preventDefault();

        const title = document.getElementById('ticket-title').value;
        const description = document.getElementById('ticket-description').value;
        const status = document.getElementById('ticket-status').value;

        try {
            const response = await fetch(`${backend_url}/api/tickets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ title, description, status }),
            });

            if (!response.ok) {
                throw new Error('Failed to create ticket');
            }

            const newTicket = await response.json();
            addTicketToDOM(newTicket);
            form.reset();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to create ticket. Please try again.');
        }
    }

    async function fetchTickets() {
        try {
            const response = await fetch(`${backend_url}/api/tickets`);
            if (!response.ok) {
                throw new Error('Failed to fetch tickets');
            }
            const tickets = await response.json();
            tickets.forEach(addTicketToDOM);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to fetch tickets. Please refresh the page.');
        }
    }

    function addTicketToDOM(ticket) {
        const ticketElement = document.createElement('div');
        ticketElement.className = 'ticket';
        ticketElement.innerHTML = `
            <h3>${ticket.title}</h3>
            <p>${ticket.description}</p>
            <p class="status ${ticket.status.toLowerCase()}">${ticket.status}</p>
            <p>Created: ${new Date(ticket.createdAt).toLocaleString()}</p>
        `;
        ticketsContainer.prepend(ticketElement);
    }
});