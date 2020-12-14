
function getReps(state) {
    return state.reps.officials.map(rep => 
      state.reps.officials.name
    );
  }
  
  function mapStateToProps(state) {
    return {
      reps: getReps(state)
    }
  }