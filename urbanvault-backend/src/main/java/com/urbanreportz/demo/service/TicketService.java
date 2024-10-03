package com.urbanreportz.demo.service;


import com.urbanreportz.demo.model.Ticket;
import com.urbanreportz.demo.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class TicketService {
    @Autowired
    private TicketRepository ticketRepository;

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Optional<Ticket> getTicketById(Long id) {
        return ticketRepository.findById(id);
    }

    public Ticket createTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    public Ticket updateTicket(Long id, Ticket ticketDetails) {
        Optional<Ticket> ticket = ticketRepository.findById(id);
        if (ticket.isPresent()) {
            Ticket existingTicket = ticket.get();
            existingTicket.setTitle(ticketDetails.getTitle());
            existingTicket.setDescription(ticketDetails.getDescription());
            existingTicket.setStatus(ticketDetails.getStatus());
            return ticketRepository.save(existingTicket);
        }
        return null;
    }

    public void deleteTicket(Long id) {
        ticketRepository.deleteById(id);
    }
}