const mongoose =require('mongoose')
const Schema = mongoose.Schema
const data = require('./data')
const sha1 = require('sha1')
const Sequence = require('./sequence')

const UserSchema = new Schema(
    {
    name: String,
    password: String,
    salt: String            // 使用csprng随机生成的盐
    },
    { versionKey: false }
)

const ArticleSchema = new Schema(
    {
        aid: { type : Number, index: { unique: true } },
        title: String,
        content: String,
        tags: [String],
        date: Date,
        isPublish: Boolean,
        comment_n: Number
    },
    { versionKey: false }
)
const CommentSchema = new Schema(
    {
        imgName: String,
        name: String,
        address: String,
        content: String,
        articleId: Number,
        date: Date,
        like: Number
    },
    { versionKey: false }
)

// 生成从0开始自增长的文章aid
ArticleSchema.pre('save', function(next) {
    var self = this;
    if( self.isNew ) {
        Sequence.increment('Article',function (err, result) {
            if (err)
                throw err;
            self.aid = result.value.next;
            next();
        });
    } else {
        next();
    }
})

const Models = {
    User: mongoose.model('User', UserSchema),
    Article: mongoose.model('Article', ArticleSchema),
    Comment: mongoose.model('Comment', CommentSchema)
}

// 初始化数据
const initialize = () => {
    console.log('开始初始化数据...')
    Models.User.find({}, (err, doc) => {
        if (err) {
            console.log(err)
            console.log('初始化数据失败')
        } else if (!doc.length) {
            Promise.all(data.map((item) => { new Models['Article'](item).save() }))
                .then(() => { console.log('数据初始化成功') })
                .catch(() => { console.log('数据初始化失败') })
        } else {
            console.log('数据初始化成功')
        }
    })
}
mongoose.Promise = global.Promise
mongoose.connect('mongodb://127.0.0.1:27017/myblog')

const db = mongoose.connection

db.on('error',console.error.bind(console,'数据库连接失败.'));
db.once('open', () => {
    console.log('数据库连接成功.')
    initialize()
});

module.exports = Models
