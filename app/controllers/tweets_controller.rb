class TweetsController < ApplicationController

  def index
    @tweets = Tweet.all
    render json: @tweets
  end

  def create
    @tweet = Tweet.create(tweet: params[:tweet])
    render json: @tweet
  end
end
