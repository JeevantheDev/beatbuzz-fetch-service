const db = require('../model');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const Songs = db.songs;
const VideoChannels = db.videoChannels;
const Playlists = db.playlists;

module.exports = {
  Query: {
    allSongs: () => {
      return Songs.findAll();
    },
    searchSongs: (root, { searchQuery }) => {
      console.log(searchQuery);
      return Songs.findAll({
        where: {
          [Op.or]: [
            {
              videoTitle: {
                [Op.like]: `%${searchQuery}%`,
              },
            },
          ],
        },
      });
    },
    allChannels: () => {
      return VideoChannels.findAll();
    },
    allPlaylistsByUser: (root, args, { authorization: token }) => {
      const userInfo = jwt.verify(token, process.env.secretKey);

      return Playlists.findAll({
        where: {
          user_id: userInfo.id,
        },
      });
    },
    getSong: (root, { songId }) => {
      return Songs.findOne({
        where: {
          id: songId,
        },
      });
    },
    getSongByChannel: (root, { channelId }) => {
      return Songs.findAll({
        where: {
          videoChannelId: channelId,
        },
      });
    },
    getSongByUser: (root, {}, { authorization: token }) => {
      const userInfo = jwt.verify(token, process.env.secretKey);

      return Songs.findAll({
        where: {
          user_id: userInfo.id,
        },
      });
    },
    getPlaylist: (root, { playlistId }, { authorization: token }) => {
      const userInfo = jwt.verify(token, process.env.secretKey);

      return Playlists.findOne({
        where: {
          id: playlistId,
          user_id: userInfo.id,
        },
      });
    },
    getSongByPlaylist: async (
      root,
      { playlistId },
      { authorization: token }
    ) => {
      const userInfo = jwt.verify(token, process.env.secretKey);

      const playlist = await Playlists.findOne({
        where: {
          id: playlistId,
          user_id: userInfo.id,
        },
      });

      if (playlist) {
        const { songs } = playlist;

        return (songs || []).map((songId) =>
          Songs.findOne({
            where: {
              id: songId,
            },
          })
        );
      }

      return [];
    },
  },
};
