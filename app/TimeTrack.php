<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TimeTrack extends Model
{
    protected $fillable = [
        'user_id','started_at','ended_at','total_hours','active'
    ];
}
