const PostSchema = require('../model/Post.js');
const mongoose = require('mongoose');

var Post = null;
class PostSocket {
    constructor(con) {
        Post = con.model('Post', PostSchema);
    }

    putPosts(data, res) {
        var query = {hash: data.hash};
        var update = {
            title: data.title,
            time: data.time,
            content: data.content,
            timestamp: data.timestamp,
            author: data.author,
            hash: data.hash
        };
        var options = {upsert: true, new: true, setDefaultsOnInsert: true};
        Post.findOneAndUpdate(query, update, options, function(error, result) {
            if (error) {
                res.send(error);
                return;
            } else {
                res.send(result);
            }
        });
    }

    loadPostList(host, res) {
        Post.find({author: host}, function(error, posts) {
            if (error) {
                // console.log(error)
                res.send(error);
                return;
            } else {
                // console.log(posts)
                res.send(posts);
            }
        });
    }

    deleteArticle(hash, res) {
        const query = {hash: hash};
        Post.findOneAndRemove(query, function(error, result) {
            if (error) {
                res.send(error);
                return;
            } else {
                res.send(result);
            }
        });
    }
}

module.exports = PostSocket;