var qs = require('querystring');

//发送html响应
exports.sendHtml = function(res, html) {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
};

//解析http post数据
exports.parseReceivedData = function(req, cb) {
    var body = '';
    req.setEncoding('utf8');
    req.on('data', function(chunck) {
        body += chunck;
    });
    req.on('end', function() {
        var data = qs.parse(body);
        cb(data);
    })
};

//渲染简单的表单
exports.actionForm = function(id, path, label) {
    var html = '<form method = "POST" action = "' + path + '">'
               +'<input type = "hidden" name = "id" value = "' + id + '" />'
               +'<input type = "submit" value = "' + label + '" />'
               +'</form>'
    return html;
}

//添加工作记录
exports.add = function(db, req, res) {
    exports.parseReceivedData(req, function(work) {
        db.query(
            "INSERT INTO work (hours, date, description)"
            +"VALUES (?, ?, ?)",
            [work.hours, work.date, work.description],
            function(err) {
                if(err) throw err;
                exports.show(db, res)
            }
        )
    })
}

//删除工作记录
exports.delete = function(db, req, res) {
    exports.parseReceivedData(req, function(work) {
        db.query(
            "DELETE FROM work WHERE id = ?",
            [work.id],
            function(err) {
                if(err) throw err;
                exports.show(db, res)
            }
        )
    })
}

//归档一条工作记录
exports.archive = function(db, req, res) {
    exports.parseReceivedData(req, function(work) {
        db.query(
            "UPDATE work SET archived = 1 WHRER id = ?",
            [work.id],
            function(err) {
                if(err) throw err;
                exports.show(db, res)
            }
        )
    })
}

//获取工作记录
exports.show = function(db, res, showArchived) {
    var query = "SELECT * FROM work "
                +"WHERE archived = ? "
                +"ORDER BY date DESC";
    var archiveValue = (showArchived) ? 1 : 0;
    db.query(
        query,
        [archiveValue],
        function(err, rows) {
            if(err) throw err;
            html = (showArchived) ? '' : '<a href = "/archived">Archived Work</a><br/>';
            html += exports.workHitlistHtml(rows);
            html += exports.workFormHtml();
            exports.sendHtml(res, html);
        }
    )
}

exports.showArchived = function(db, res) {
    exports.show(db, res, true);
}

//将工作记录渲染为HTML表格
exports.workHitlistHtml = function(rows) {
    var html = '<table>';
    for(var i in rows) {
        html += '<tr>'
                +'<td>' + rows[i].date + '</td>'
                +'<td>' + rows[i].hours + '</td>'
                +'<td>' + rows[i].description + '</td>';
        if(!rows[i].archived) {
            html += '<td>' + exports.workArchiveForm(rows[i].id) + '</td>';
        }
        html += '<td>' + exports.workDeleteForm(rows[i].id) + '</td>';
        html += '</tr>'
    }
    html += '</table>'
    return html;
}

exports.workFormHtml = function() {
    var html = '<form method = "POST" action = "/">'
               +'<p>Date (YYYY-MM-DD):<br/><input name = "date" type = "text" /></p>'
               +'<p>Hours worked:<br/><input name = "hours" type = "text" /></p>'
               +'<p>Description:<br/><textarea name = "description"></textarea></p>'
               +'<input type = "submit" value = "Add" />'
               +'</form>';
    return html;
}

exports.workArchiveForm = function(id) {
    return exports.actionForm(id, '/archive', 'Archive');
}

exports.workDeleteForm = function(id) {
    return exports.actionForm(id, '/delete', 'Delete');
}