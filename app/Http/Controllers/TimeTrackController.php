<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Validator;
use App\Http\Requests;
use App\TimeTrack;
use App\Http\Resources\TimeTrack as TimeTrackResource;
use Carbon\Carbon;

class TimeTrackController extends Controller
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function apiTime()
    {
        $currentTime = Carbon::now()->toDateTimeString();
        return ['time' => $currentTime ];
    }

    public function userTime($user_id)
    {
        //Get time
        //$time = Time::findOrFail($user_id);
        $time = User::findOrFail($user_id)->time;

        //Return single time as a recource
        return new TimeTrackResource($time);
    }

    public function allUsersTime()
    {
        //Get all users time
        $usersTime = User::all();
        $usersAllTime = array();
        foreach ($usersTime as $userTime)
        {
            array_push($usersAllTime,$userTime->time);
        }
        //Return all users time as a recource
        return $usersAllTime;
    }


    public function addUserTime(Request $request)
    {
        //Validate request
        $validator = Validator::make($request->all(), [
            'user_id'=> 'required',
            'started_at'=> 'required',
            'active'=> 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
//        //Add time
        $time = new TimeTrack;
        $time->user_id = $request->user_id;
        $time->started_at = $request->started_at;
        $time->active = $request->active;

        if($time->save()){
            return new TimeTrackResource($time);
        }
    }

    public function updateUserTime(Request $request){
        //Validate request
        $validator = Validator::make($request->all(), [
            'user_id'=> 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        //Updating user time
        $newTime = TimeTrack::find($request['id']);
        if($request->user_id) $newTime->user_id = $request->user_id;
        if($request->started_at) $newTime->started_at = $request->started_at;
        if($request->ended_at) $newTime->ended_at = $request->ended_at;
        if($request->total_hours) $newTime->total_hours = $request->total_hours;
        if($request->active) $newTime->active = $request->active;

        if($newTime->update()){
            return new TimeTrackResource($newTime);
        }
    }
}
