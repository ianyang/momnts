Project::Application.routes.draw do
  devise_for :users
  devise_for :users do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end

  root :to => "home#index"

  resources :events
  get '/search' => 'events#search'
  get '/attend' => 'events#index'
  get '/propose' => 'events#new'
  get '/display' => 'events#display'

end
