class UsersController < ApplicationController
  before_filter :authenticate_user!

  def new
    @user = User.new()
  end

  def create
    @event = current_user.event.build{params[:event]}
    @user=User.new(params[:user])
    if @user.save
      flash[:success] = "Welcome to the app!"
      sign_in @user
      redirect_to @user
    else
      render'new'
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    @user.update_attributes(params[:user])
    render :edit
  end

  def destroy
    user = User.find(params[:id])
    user.delete
    redirect_to(users_path)
  end

end
