using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using server.Models;

namespace server.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IDictionary<string, User> _user;
        private readonly string _bot;
        public ChatHub(IDictionary<string, User> user)
        {
            _bot = "My Chat Bot";
            _user = user;
        }
        public override Task OnDisconnectedAsync(Exception exception)
        {
            if (_user.TryGetValue(Context.ConnectionId, out User user))
            {
                _user.Remove(Context.ConnectionId);
                Clients.Group(user.RoomId).SendAsync("ReceiveMessage", _bot, $"{user.UserName} has left");
                ListUserConnected(user.RoomId);
            }

            return base.OnDisconnectedAsync(exception);
        }

        // public override Task OnConnectedAsync()
        // {
        // }

        // Send message to all clients
        // public async Task SendMessage(ChatMessage message)
        // {
        //     await Clients.All.SendAsync("ReceiveMessage", message);
        // }

        //Send message to clients in group
        public async Task SendMessage(ChatMessage message)
        {
            if (_user.TryGetValue(Context.ConnectionId, out User user))
            {
                await Clients.Group(user.RoomId).SendAsync("ReceiveMessage", user.UserName, message.Message);
            }
        }

        public async Task JoinRoom(User user)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, user.RoomId);
            _user[Context.ConnectionId] = user;
            await Clients.Group(user.RoomId).SendAsync("ReceiveMessage", _bot, $"{user.UserName} has joined the group {user.RoomId}");
            await ListUserConnected(user.RoomId);
        }

        public async Task ListUserConnected(string roomId)
        {
            var users = _user.Values.Where(c => c.RoomId == roomId).Select(c => c.UserName);

            await Clients.Group(roomId).SendAsync("UserInRoom", users);
        }
    }
}