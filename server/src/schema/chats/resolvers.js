import mongoose from 'mongoose';
const Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

import { PubSub } from 'graphql-subscriptions';
import { ApolloError } from 'apollo-server-core';

const pubsub = new PubSub();

const Chat = mongoose.model(
	'Chat',

	new Schema({
		user_name: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		date: {
			type: String,
			required: false,
		},
	})
);

const resolvers = {
	Query: {
		allChats: async () => {
			const chats = await Chat.find({});
			if (chats) {
				return [...chats];
			} else {
				throw new ApolloError('No Chat found');
			}
		},
	},
	Mutation: {
		addChat: async (_, args) => {
			const chat = new Chat({ ...args });
			chat.save();
			if (chat) {
				console.log(chat);
				pubsub.publish('TRIGGER_ADD_CHAT', { addedChat: chat });
				return chat;
			} else {
				throw new ApolloError('Failed to send message');
			}
		},
	},
	Subscription: {
		addedChat: {
			subscribe: () => pubsub.asyncIterator(['TRIGGER_ADD_CHAT']),
		},
	},
};
export default resolvers;
