module.exports = `#graphql
  type Song {
    user_id: Int!
    id: String!
    audio: String!
    keywords: [String]!
    category: String!
    videoChannelId: String!
    videoTitle: String!
    videoURL: String!
    thumbnail: String!
    createdAt: String!
    updatedAt: String!
  }

  type Channel {
    videoChannelId: String!
    videoChannelThumbnail: String!
    videoChannel: String!
    createdAt: String!
    updatedAt: String!
  }

  type Playlist {
    user_id: Int!
    id: Int!
    title: String!
    thumbnail: String!
    songs: [String]!
  }

  type Query {
    allSongs: [Song!]!
    allChannels: [Channel!]!
    allPlaylistsByUser: [Playlist]!
    getSong(songId: String!): Song
    getSongByChannel(channelId: String!): [Song!]!
    getPlaylist(playlistId: Int!): Playlist!
    getSongByPlaylist(playlistId: Int!): [Song!]!
    getSongByUser: [Song!]!
  }
`;
